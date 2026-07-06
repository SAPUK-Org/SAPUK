"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import { GripVertical, RotateCcw, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardCardWrapper {
  id: string;
  component: ReactNode;
  colSpan: string;
}

interface RearrangeableGridProps {
  cards: DashboardCardWrapper[];
  defaultOrder: string[];
}

export function RearrangeableGrid({
  cards,
  defaultOrder,
}: RearrangeableGridProps) {
  const [order, setOrder] = useState<string[]>(defaultOrder);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [locked, setLocked] = useState(true);
  const dragNode = useRef<HTMLDivElement | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      if (locked) return;
      setDraggedId(id);
      dragNode.current = e.currentTarget as HTMLDivElement;
      e.dataTransfer.effectAllowed = "move";
      requestAnimationFrame(() => {
        if (dragNode.current) {
          dragNode.current.style.opacity = "0.4";
        }
      });
    },
    [locked],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.preventDefault();
      if (locked || !draggedId || draggedId === id) return;
      setDragOverId(id);
    },
    [locked, draggedId],
  );

  const handleDragEnd = useCallback(() => {
    if (dragNode.current) {
      dragNode.current.style.opacity = "1";
    }
    if (draggedId && dragOverId && draggedId !== dragOverId) {
      setOrder((prev) => {
        const newOrder = [...prev];
        const draggedIdx = newOrder.indexOf(draggedId);
        const overIdx = newOrder.indexOf(dragOverId);
        newOrder.splice(draggedIdx, 1);
        newOrder.splice(overIdx, 0, draggedId);
        return newOrder;
      });
    }
    setDraggedId(null);
    setDragOverId(null);
    dragNode.current = null;
  }, [draggedId, dragOverId]);

  const handleDragLeave = useCallback(() => {
    setDragOverId(null);
  }, []);

  const resetOrder = () => {
    setOrder(defaultOrder);
  };

  const cardMap = new Map(cards.map((c) => [c.id, c]));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant={locked ? "outline" : "default"}
                  size="sm"
                  onClick={() => setLocked(!locked)}
                  className={!locked ? "bg-primary text-primary-foreground" : ""}
                />
              }
            >
              {locked ? (
                <>
                  <Lock className="h-3.5 w-3.5 mr-1.5" /> Layout Locked
                </>
              ) : (
                <>
                  <Unlock className="h-3.5 w-3.5 mr-1.5" /> Rearranging
                </>
              )}
            </TooltipTrigger>
            <TooltipContent>
              {locked
                ? "Click to unlock and rearrange cards"
                : "Click to lock the layout"}
            </TooltipContent>
          </Tooltip>
          {!locked && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetOrder}
                    className="text-muted-foreground"
                  />
                }
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
              </TooltipTrigger>
              <TooltipContent>Reset to default layout</TooltipContent>
            </Tooltip>
          )}
        </div>
        {!locked && (
          <p className="text-sm text-muted-foreground">
            Drag cards to rearrange your dashboard
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 grid-auto-rows-[minmax(500px,auto)]">
        {order.map((id) => {
          const card = cardMap.get(id);
          if (!card) return null;

          const isDragging = draggedId === id;
          const isDragOver = dragOverId === id;

          return (
            <div
              key={id}
              draggable={!locked}
              onDragStart={(e) => handleDragStart(e, id)}
              onDragOver={(e) => handleDragOver(e, id)}
              onDragEnd={handleDragEnd}
              onDragLeave={handleDragLeave}
              className={`relative group flex flex-col min-h-0 max-h-[500px] transition-all duration-200 ${card.colSpan} ${
                isDragging ? "scale-[0.98] z-10" : ""
              } ${isDragOver ? "ring-2 ring-primary/40 ring-offset-2 ring-offset-background rounded-xl" : ""} ${
                !locked ? "cursor-grab active:cursor-grabbing" : ""
              }`}
            >
              {!locked && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 rounded-full bg-card border border-border px-2 py-0.5 shadow-md">
                    <GripVertical className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground font-medium">
                      Drag
                    </span>
                  </div>
                </div>
              )}
              {card.component}
            </div>
          );
        })}
      </div>
    </div>
  );
}
