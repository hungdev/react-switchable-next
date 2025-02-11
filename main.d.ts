import { ReactNode, KeyboardEventHandler, JSX } from "react";

interface ItemProps {
  name?: string;
  active?: boolean;
  className?: string;
  disable?: boolean;
  value: string;
  children?: ReactNode;
  [key: string]: any;
}

declare const Item: (props: ItemProps) => JSX.Element;

interface OverlayProps {
  selectedIndex: number;
  totalItems: number;
  className?: string;
  [key: string]: any;
}

declare const Overlay: (props: OverlayProps) => JSX.Element;

interface SwitchProps {
  children: ReactNode[];
  onValueChange?: (value: string, newIndex: number, oldIndex: number, child: ReactNode) => void;
  onSelection?: (index: number) => void;
  onItemChanged?: (value: string, newIndex: number, oldIndex: number, child: ReactNode) => void;
  onItemSelected?: (index: number) => void;
  tabIndex?: number;
  disable?: boolean;
  arrowSelection?: boolean;
  className?: string;
  name: string;
  customOverlay?: (props: OverlayProps) => JSX.Element;
  onKeyDown?: KeyboardEventHandler;
  [key: string]: any;
}

declare const Switch: (props: SwitchProps) => JSX.Element;

export { Item, Overlay, Switch };
