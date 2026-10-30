'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/src/data/originals'

export interface CartItem {
  product: Product
  size: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Product, size: string) => void
  removeFromCart: (productId: number, size: string) => void
  updateQuantity: (productId: number, size: string, delta: number) => void
  clearCart: () => void
  totalCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Initialize with 1 item so the cart feels alive immediately for PoC / e-commerce showcase
  useEffect(() => {
    try {
      const stored = localStorage.getItem('obs_cart')
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch {
      // fallback
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('obs_cart', JSON.stringify(items))
    } catch {
      // fallback
    }
  }, [items])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const addToCart = (product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      )
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, size, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeFromCart = (productId: number, size: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    )
  }

  const updateQuantity = (productId: number, size: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const clearCart = () => setItems([])

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = items.reduce((acc, item) => {
    const price = item.product.ourPrice || item.product.mrp || 4999
    return acc + price * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

