import { createStyles, MantineSize, Textarea } from '@mantine/core';
import { useEffect } from 'react';

const useStyles = createStyles((theme, { size }: { size: MantineSize }) => ({
  input: {
    fontFamily: 'monospace',
    fontSize: theme.fn.size({ size, sizes: theme.fontSizes }) - 2,
    height: '80vh',
  },
}));

export default function CodeInput({ ...props }) {
  const { classes } = useStyles({ size: 'md' }, { name: 'CodeInput' });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (document.activeElement?.tagName !== 'TEXTAREA') return;

        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart;
        const end = target.selectionEnd;
        target.value = `${target.value.substring(0, start)}  ${target.value.substring(end)}`;
        target.selectionStart = target.selectionEnd = start + 2;
        target.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <Textarea classNames={{ input: classes.input }} {...props} />;
}
