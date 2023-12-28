import { CopyButton as MantineCopyButton, Button } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface CopyButtonProps {
  value: string;
}

export function CopyButton({ value }: CopyButtonProps) {
  return (
    <MantineCopyButton value={value}>
      {({ copied, copy }) => (
        <Button
          leftSection={
            copied ? <IconCheck size={14} /> : <IconCopy size={14} />
          }
          color={copied ? "teal" : "blue"}
          size="compact-sm"
          variant="default"
          onClick={copy}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      )}
    </MantineCopyButton>
  );
}
