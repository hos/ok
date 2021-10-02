import { useCallback, useEffect, useState } from "react";
import { CSSProperties } from "styled-components";

interface IUseShortcutProps {
  selector: string;
  styleDown?: CSSProperties;
  styleUp?: CSSProperties;
  bodyClass?: string;
  key: string;
  clickCount?: number;
}

export const useShortcut = () => {
  for (const short of Shortcuts) {
    useShortcutSingle(short); // eslint-disable-line
  }
};

export const useShortcutSingle = (props: IUseShortcutProps) => {
  const {
    selector,
    styleDown,
    styleUp,
    key,
    clickCount = 5,
    bodyClass,
  } = props;
  const [counter, setCounter] = useState(0);

  const addFilter = useCallback(() => {
    const elements = Array.from(
      document.querySelectorAll(selector)
    ) as HTMLElement[];
    if (!elements?.length) {
      return null;
    }
    for (const element of elements) {
      Object.assign(element.style, styleDown);
    }
    if (bodyClass) {
      document.querySelector("body")?.classList.add(bodyClass);
    }
  }, [bodyClass, selector, styleDown]);

  const removeFilter = useCallback(() => {
    const elements = Array.from(
      document.querySelectorAll(selector)
    ) as HTMLElement[];
    if (!elements) {
      return null;
    }
    for (const element of elements) {
      Object.assign(element.style, styleUp);
    }
    if (bodyClass) {
      document.querySelector("body")?.classList.remove(bodyClass);
    }
  }, [bodyClass, selector, styleUp]);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.repeat) {
        return;
      }
      if (e.key === key) {
        addFilter();
      }
    };

    const onUp = (e: KeyboardEvent) => {
      if (e.repeat) {
        return;
      }
      if (e.key === key) {
        removeFilter();
      }
    };

    document.addEventListener("keydown", onDown);
    document.addEventListener("keyup", onUp);

    return () => {
      document.removeEventListener("keydown", onDown);
      document.removeEventListener("keyup", onUp);
    };
  }, [addFilter, removeFilter, key]);

  useEffect(() => {
    if (counter === clickCount) {
      addFilter();
    }

    if (counter > clickCount) {
      setCounter(0);
      removeFilter();
    }
  }, [counter, setCounter, addFilter, removeFilter, clickCount]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(selector)
    ) as HTMLElement[];

    const add = () => setCounter((c) => c + 1);

    for (const element of elements) {
      element?.addEventListener("click", add);
    }

    return () => {
      for (const element of elements) {
        element?.removeEventListener("click", add);
      }
    };
  }, [selector]);
};

export const Shortcuts: IUseShortcutProps[] = [
  {
    selector: `.album img[alt^="Sevan"]`,
    styleDown: {
      transition: "0.3s",
      transform: `rotateZ(180deg)`,
    },
    styleUp: {
      transform: `none`,
    },
    key: "r",
    clickCount: 10,
  },
  {
    selector: 'img[alt="The Origin of the World"]',
    key: "o",
    styleDown: {
      transition: `2s`,
      filter: "invert(100%)",
    },
    styleUp: {
      transition: `2s`,
      filter: "none",
    },
  },
  {
    selector: `body`,
    styleDown: {},
    styleUp: {},
    bodyClass: "focus",
    key: "z",
  },
];
