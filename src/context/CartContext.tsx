"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { formatPrice } from "@/lib/utils";

export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  priceFormatted: string;
  quantity: number;
  variant: string;
}

// Quantity is optional on input (defaults to 1) — addItem fills it in.
export type AddItemInput = Omit<CartItem, "quantity"> & { quantity?: number };

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: AddItemInput) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: string;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: AddItemInput) => {
    const qtyToAdd = item.quantity ?? 1;
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.id === item.id && p.size === item.size
      );
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qtyToAdd };
        return next;
      }
      return [...prev, { ...item, quantity: qtyToAdd }];
    });
  }, []);

  const removeItem = useCallback((id: string, size: string) => {
    setItems((prev) => prev.filter((p) => !(p.id === id && p.size === size)));
  }, []);

  const updateQuantity = useCallback(
    (id: string, size: string, qty: number) => {
      setItems((prev) => {
        if (qty <= 0) {
          return prev.filter((p) => !(p.id === id && p.size === size));
        }
        return prev.map((p) =>
          p.id === id && p.size === size ? { ...p, quantity: qty } : p
        );
      });
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = useMemo(
    () => items.reduce((sum, p) => sum + p.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(() => {
    const total = items.reduce((sum, p) => sum + p.price * p.quantity, 0);
    return formatPrice(total);
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      totalItems,
      totalPrice,
    }),
    [
      items,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      totalItems,
      totalPrice,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
