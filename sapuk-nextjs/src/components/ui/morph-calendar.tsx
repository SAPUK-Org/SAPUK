"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  setMonth,
  setYear,
  getYear,
  startOfWeek,
  endOfWeek,
  isToday,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Clock,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type MorphCalendarEvent = {
  id: string;
  title: string;
  time: string;
  type: "meeting" | "task" | "reminder" | "focus";
  completed?: boolean;
};

export type MorphCalendarDayData = {
  events: MorphCalendarEvent[];
  notes: string;
  /** Only used when {@link MorphCalendarProps.showStats} is true. */
  productivity?: number;
  tasks?: number;
  completed?: number;
};

export type MorphCalendarProps = {
  getDayData: (date: Date) => MorphCalendarDayData;
  getActivityLevel?: (date: Date) => number;
  defaultMonth?: Date;
  /** Earliest year shown in the year picker (inclusive). Defaults to 100 years before today. */
  fromYear?: number;
  /** Latest year shown in the year picker (inclusive). Defaults to 10 years after today. */
  toYear?: number;
  /** Show productivity ring and tasks-done widgets in the day detail view. */
  showStats?: boolean;
  className?: string;
};

type PickerView = "closed" | "month" | "year";

const MONTH_LABELS = Array.from({ length: 12 }, (_, i) =>
  format(new Date(2000, i, 1), "MMM"),
);

const YEARS_PER_PAGE = 12;

function clampYear(year: number, fromYear: number, toYear: number) {
  return Math.min(Math.max(year, fromYear), toYear);
}

function getYearPageStart(year: number, fromYear: number, toYear: number) {
  const maxStart = Math.max(fromYear, toYear - YEARS_PER_PAGE + 1);
  const start = Math.floor(year / YEARS_PER_PAGE) * YEARS_PER_PAGE;
  return clampYear(start, fromYear, maxStart);
}

const ActivityIndicator = ({ level }: { level: number }) => (
  <motion.div className="flex gap-0.5">
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className={cn(
          "h-1 w-1 rounded-full",
          i <= level ? "bg-primary" : "bg-muted",
        )}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: i * 0.05 }}
      />
    ))}
  </motion.div>
);

const ProgressRing = ({
  progress,
  size = 48,
}: {
  progress: number;
  size?: number;
}) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size}>
        <circle
          className="text-muted"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className="text-primary"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <motion.div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-foreground">
          {progress}%
        </span>
      </motion.div>
    </div>
  );
};

const eventTypeConfig = {
  meeting: {
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    icon: Calendar,
  },
  task: {
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    icon: CheckCircle2,
  },
  reminder: {
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    icon: Clock,
  },
  focus: {
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    icon: Zap,
  },
};

const ExpandedView = ({
  date,
  data,
  showStats,
  onClose,
}: {
  date: Date;
  data: MorphCalendarDayData;
  showStats: boolean;
  onClose: () => void;
}) => {
  const eventCount = data.events.length;
  const eventCountLabel = eventCount === 1 ? "1 event" : `${eventCount} events`;
  return (
    <motion.div
      className="absolute inset-0 z-20 overflow-hidden rounded-xl bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <motion.div className="relative flex h-full flex-col">
        <motion.div
          className="flex items-center justify-between border-b border-border/50 px-5 py-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div>
            <motion.h2
              className="text-xl font-semibold text-foreground"
              layoutId={`date-${format(date, "yyyy-MM-dd")}`}
            >
              {format(date, "EEEE, MMMM d")}
            </motion.h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {showStats
                ? `${eventCountLabel} · ${data.tasks ?? 0} tasks`
                : eventCountLabel}
            </p>
          </motion.div>
          <motion.button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-colors hover:bg-zinc-200 hover:text-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
          >
            <X className="h-4 w-4" />
          </motion.button>
        </motion.div>

        <motion.div className="flex-1 overflow-y-auto p-5">
          <div className="grid gap-5">
            {showStats ? (
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex flex-col items-center justify-center rounded-lg border border-border/50 bg-muted/30 p-3">
                  <ProgressRing progress={data.productivity ?? 0} size={44} />
                  <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Productivity
                  </span>
                </div>
                <motion.div className="flex flex-col items-center justify-center rounded-lg border border-border/50 bg-muted/30 p-3">
                  <div className="flex h-11 items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">
                      {data.completed ?? 0}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      /{data.tasks ?? 0}
                    </span>
                  </div>
                  <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Tasks Done
                  </span>
                </motion.div>
              </motion.div>
            ) : null}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: showStats ? 0.2 : 0.15 }}
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Timeline
              </h3>
              <div className="space-y-2">
                {data.events.map((event, i) => {
                  const config = eventTypeConfig[event.type];
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={event.id}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 transition-colors",
                        config.color,
                        event.completed && "opacity-60",
                      )}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: event.completed ? 0.6 : 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "truncate text-sm font-medium",
                            event.completed && "line-through",
                          )}
                        >
                          {event.title}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-medium">
                        {event.time}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Notes
              </h3>
              <p className="rounded-lg border border-border/50 bg-muted/30 p-3 text-sm text-foreground/80">
                {data.notes}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const MonthYearPicker = ({
  view,
  currentMonth,
  fromYear,
  toYear,
  yearPageStart: yearPageStartProp,
  onYearPageStartChange,
  onSelectMonth,
  onSelectYear,
  onClose,
}: {
  view: Exclude<PickerView, "closed">;
  currentMonth: Date;
  fromYear: number;
  toYear: number;
  yearPageStart: number;
  onYearPageStartChange: (start: number) => void;
  onSelectMonth: (monthIndex: number) => void;
  onSelectYear: (year: number) => void;
  onClose: () => void;
}) => {
  const currentYear = getYear(currentMonth);
  const currentMonthIndex = currentMonth.getMonth();
  const years = Array.from(
    { length: YEARS_PER_PAGE },
    (_, i) => yearPageStartProp + i,
  ).filter((y) => y >= fromYear && y <= toYear);

  const canPrevYears = yearPageStartProp > fromYear;
  const canNextYears = yearPageStartProp + YEARS_PER_PAGE <= toYear;

  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col rounded-b-xl bg-background/95 p-4 backdrop-blur-sm"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-label={view === "month" ? "Choose month" : "Choose year"}
    >
      <motion.div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {view === "month" ? "Select month" : "Select year"}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Done
        </button>
      </motion.div>

      {view === "month" ? (
        <div className="grid flex-1 grid-cols-3 gap-2 content-start">
          {MONTH_LABELS.map((label, monthIndex) => {
            const isActive = monthIndex === currentMonthIndex;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onSelectMonth(monthIndex)}
                className={cn(
                  "rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/50 bg-muted/30 text-foreground hover:bg-muted",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              disabled={!canPrevYears}
              onClick={() =>
                onYearPageStartChange(
                  Math.max(fromYear, yearPageStartProp - YEARS_PER_PAGE),
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
              aria-label="Previous years"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold text-foreground">
              {years[0]} – {years[years.length - 1]}
            </span>
            <button
              type="button"
              disabled={!canNextYears}
              onClick={() =>
                onYearPageStartChange(
                  Math.min(
                    Math.max(fromYear, toYear - YEARS_PER_PAGE + 1),
                    yearPageStartProp + YEARS_PER_PAGE,
                  ),
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
              aria-label="Next years"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2 content-start">
            {years.map((year) => {
              const isActive = year === currentYear;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => onSelectYear(year)}
                  className={cn(
                    "rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/50 bg-muted/30 text-foreground hover:bg-muted",
                  )}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
};

const DayCell = ({
  date,
  currentMonth,
  isSelected,
  activityLevel,
  onClick,
}: {
  date: Date;
  currentMonth: Date;
  isSelected: boolean;
  activityLevel: number;
  onClick: () => void;
}) => {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isCurrentDay = isToday(date);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex h-12 w-full flex-col items-center justify-center rounded-lg transition-colors duration-300 ease-in-out",
        isCurrentMonth
          ? "text-foreground hover:bg-primary/10"
          : "text-muted-foreground/40",
        isCurrentDay && "ring-1 ring-primary/50",
        isSelected && "bg-primary text-primary-foreground hover:bg-primary/80",
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <span
        className={cn(
          "text-sm font-medium",
          isCurrentDay && !isSelected && "text-primary",
        )}
      >
        {format(date, "d")}
      </span>
      {isCurrentMonth && !isSelected && activityLevel > 0 && (
        <div className="mt-0.5">
          <ActivityIndicator level={activityLevel} />
        </div>
      )}

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-lg bg-primary/10 opacity-0 blur-sm group-hover:opacity-100"
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export function MorphCalendar({
  getDayData,
  getActivityLevel,
  defaultMonth = new Date(),
  fromYear: fromYearProp,
  toYear: toYearProp,
  showStats = false,
  className,
}: MorphCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const fromYear = fromYearProp ?? getYear(today) - 100;
  const toYear = toYearProp ?? getYear(today) + 10;

  const [currentMonth, setCurrentMonth] = useState(() =>
    startOfMonth(defaultMonth),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [pickerView, setPickerView] = useState<PickerView>("closed");
  const [yearPageStart, setYearPageStart] = useState(() =>
    getYearPageStart(getYear(defaultMonth), fromYear, toYear),
  );
  const monthViewRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedData = useMemo(() => {
    if (!selectedDate) return null;
    return getDayData(selectedDate);
  }, [selectedDate, getDayData]);

  const handlePrevMonth = () => {
    if (!selectedDate) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const handleNextMonth = () => {
    if (!selectedDate) {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const handleDateClick = (date: Date) => {
    if (isSameMonth(date, currentMonth)) {
      setSelectedDate(date);
    }
  };

  const handleClose = () => {
    setSelectedDate(null);
  };

  const closePicker = useCallback(() => setPickerView("closed"), []);

  const openMonthPicker = () => {
    setPickerView("month");
  };

  const openYearPicker = () => {
    setYearPageStart(getYearPageStart(getYear(currentMonth), fromYear, toYear));
    setPickerView("year");
  };

  const handleSelectMonth = (monthIndex: number) => {
    setCurrentMonth((prev) => setMonth(startOfMonth(prev), monthIndex));
    closePicker();
  };

  const handleSelectYear = (year: number) => {
    setCurrentMonth((prev) =>
      setYear(startOfMonth(prev), clampYear(year, fromYear, toYear)),
    );
    closePicker();
  };

  useEffect(() => {
    if (pickerView === "closed") return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        monthViewRef.current &&
        !monthViewRef.current.contains(event.target as Node)
      ) {
        closePicker();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePicker();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pickerView, closePicker]);

  return (
    <LayoutGroup>
      <motion.div
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-xl border border-border/50 bg-primary-foreground shadow-xl shadow-black/5",
          className,
        )}
        layout
        style={{ minHeight: 420 }}
      >
        <AnimatePresence mode="wait">
          {!selectedDate && (
            <motion.div
              ref={monthViewRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                <motion.button
                  type="button"
                  onClick={handlePrevMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </motion.button>
                <motion.div
                  className="flex items-baseline gap-1"
                  key={format(currentMonth, "MMM-yyyy")}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button
                    type="button"
                    onClick={openMonthPicker}
                    aria-expanded={pickerView === "month"}
                    aria-haspopup="dialog"
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted",
                      pickerView === "month" && "bg-muted",
                    )}
                  >
                    {format(currentMonth, "MMMM")}
                  </button>
                  <button
                    type="button"
                    onClick={openYearPicker}
                    aria-expanded={pickerView === "year"}
                    aria-haspopup="dialog"
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      pickerView === "year" && "bg-muted text-foreground",
                    )}
                  >
                    {format(currentMonth, "yyyy")}
                  </button>
                </motion.div>
                <motion.button
                  type="button"
                  onClick={handleNextMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>

              <motion.div className="relative p-4">
                <AnimatePresence>
                  {pickerView !== "closed" && (
                    <MonthYearPicker
                      view={pickerView}
                      currentMonth={currentMonth}
                      fromYear={fromYear}
                      toYear={toYear}
                      yearPageStart={yearPageStart}
                      onYearPageStartChange={setYearPageStart}
                      onSelectMonth={handleSelectMonth}
                      onSelectYear={handleSelectYear}
                      onClose={closePicker}
                    />
                  )}
                </AnimatePresence>
                <div className="mb-2 grid grid-cols-7 gap-1">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="flex h-8 items-center justify-center text-xs font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <motion.div className="grid grid-cols-7 gap-1">
                  {days.map((day, i) => (
                    <motion.div
                      key={day.toISOString()}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.01 }}
                    >
                      <DayCell
                        date={day}
                        currentMonth={currentMonth}
                        isSelected={
                          selectedDate ? isSameDay(day, selectedDate) : false
                        }
                        activityLevel={getActivityLevel?.(day) ?? 0}
                        onClick={() => handleDateClick(day)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {selectedDate && selectedData && (
            <ExpandedView
              date={selectedDate}
              data={selectedData}
              showStats={showStats}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
