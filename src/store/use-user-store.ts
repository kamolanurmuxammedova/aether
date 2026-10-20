import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddressItem } from "@/types";
import { PRESET_ADDRESSES } from "@/lib/constants";

export interface WalletTransaction {
  id: string;
  type: "TOPUP" | "ORDER_PAYMENT" | "REFUND" | "CASHBACK";
  amount: number;
  description: string;
  timestamp: string;
  status: "COMPLETED" | "PENDING";
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "ORDER" | "WALLET" | "PROMO" | "SECURITY";
}

interface UserState {
  // Auth state
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    tier: "Obsidian Member" | "Platinum Executive" | "Diamond Founder";
    role: "USER" | "COURIER" | "ADMIN";
  };
  
  // Wallet & Payment
  walletBalance: number;
  transactions: WalletTransaction[];
  
  // Addresses
  addresses: AddressItem[];
  
  // Notifications
  notifications: AppNotification[];
  
  // Settings & Locale
  currency: string;
  language: string;
  isSearchOpen: boolean;
  activeTab: string;

  // Actions
  login: (email: string, role?: "USER" | "COURIER" | "ADMIN") => void;
  logout: () => void;
  switchRole: (role: "USER" | "COURIER" | "ADMIN") => void;
  topUpWallet: (amount: number) => void;
  deductWallet: (amount: number, description: string) => boolean;
  addAddress: (address: Omit<AddressItem, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setCurrency: (currency: string) => void;
  setLanguage: (lang: string) => void;
  setIsSearchOpen: (open: boolean) => void;
}

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "tx_1",
    type: "TOPUP",
    amount: 500.0,
    description: "Instant Apple Pay Top-up",
    timestamp: "2 hours ago",
    status: "COMPLETED",
  },
  {
    id: "tx_2",
    type: "ORDER_PAYMENT",
    amount: -43.5,
    description: "Hyperspeed Delivery AETH-982XF",
    timestamp: "12 mins ago",
    status: "COMPLETED",
  },
  {
    id: "tx_3",
    type: "CASHBACK",
    amount: 8.7,
    description: "Obsidian Elite 20% Logistics Cashback",
    timestamp: "Yesterday",
    status: "COMPLETED",
  },
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif_1",
    title: "Hyperspeed Courier Dispatched",
    message: "Marcus Sterling is 4 mins away with your sealed tech package.",
    timestamp: "4m ago",
    read: false,
    type: "ORDER",
  },
  {
    id: "notif_2",
    title: "Quantum Fleet Priority Activated",
    message: "Your account now has zero-wait direct corridor dispatching enabled.",
    timestamp: "1h ago",
    read: false,
    type: "SECURITY",
  },
  {
    id: "notif_3",
    title: "Wallet Credit Received",
    message: "USD $500.00 added to your AETHER Digital Obsidian Vault.",
    timestamp: "2h ago",
    read: true,
    type: "WALLET",
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isAuthenticated: true,
      user: {
        id: "usr_vance_01",
        name: "Alexander Vance",
        email: "alexander.vance@vance-holdings.com",
        phone: "+1 (917) 555-0142",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        tier: "Diamond Founder",
        role: "USER",
      },
      walletBalance: 1465.2,
      transactions: INITIAL_TRANSACTIONS,
      addresses: PRESET_ADDRESSES,
      notifications: INITIAL_NOTIFICATIONS,
      currency: "USD",
      language: "EN",
      isSearchOpen: false,
      activeTab: "overview",

      login: (email, role = "USER") =>
        set((s) => ({
          isAuthenticated: true,
          user: {
            ...s.user,
            email,
            name: email.split("@")[0].toUpperCase(),
            role,
          },
        })),

      logout: () => set({ isAuthenticated: false }),

      switchRole: (role) =>
        set((s) => ({
          user: { ...s.user, role },
        })),

      topUpWallet: (amount) =>
        set((s) => ({
          walletBalance: s.walletBalance + amount,
          transactions: [
            {
              id: `tx_${Date.now()}`,
              type: "TOPUP",
              amount,
              description: "Instant Stripe Platinum Top-Up",
              timestamp: "Just now",
              status: "COMPLETED",
            },
            ...s.transactions,
          ],
        })),

      deductWallet: (amount, description) => {
        const current = get().walletBalance;
        if (current < amount) return false;
        set((s) => ({
          walletBalance: s.walletBalance - amount,
          transactions: [
            {
              id: `tx_${Date.now()}`,
              type: "ORDER_PAYMENT",
              amount: -amount,
              description,
              timestamp: "Just now",
              status: "COMPLETED",
            },
            ...s.transactions,
          ],
        }));
        return true;
      },

      addAddress: (addr) =>
        set((s) => ({
          addresses: [
            ...s.addresses,
            { ...addr, id: `addr_${Date.now()}` },
          ],
        })),

      removeAddress: (id) =>
        set((s) => ({
          addresses: s.addresses.filter((a) => a.id !== id),
        })),

      setDefaultAddress: (id) =>
        set((s) => ({
          addresses: s.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),

      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),

      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
      setIsSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
    }),
    {
      name: "aether-user-storage",
      partialize: (state) => ({
        user: state.user,
        walletBalance: state.walletBalance,
        addresses: state.addresses,
        currency: state.currency,
        language: state.language,
      }),
    }
  )
);
