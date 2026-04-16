import { Check, Copy } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";
import { toast } from "sonner";

export default function CopyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex items-center justify-between border rounded-lg px-4 py-2">
      <div className="text-left">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-transparent hover:text-zinc-800"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
