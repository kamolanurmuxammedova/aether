import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddressItem } from "@/types";
import { PRESET_ADDRESSES } from "@/lib/constants";
import { isLocale, type Locale } from "@/lib/i18n";

export type UserRole = "USER" | "COURIER" | "ADMIN";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  tier: string;
  role: UserRole;
  status: "active" | "blocked";
  password: string;
  createdAt: string;
}

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

const GUEST_USER: AppUser = {
  id: "guest",
  name: "Гость",
  email: "",
  phone: "",
  avatar: "",
  tier: "Стандарт",
  role: "USER",
  status: "active",
  password: "",
  createdAt: new Date().toISOString(),
};

const SEED_USERS: AppUser[] = [
  {
    id: "usr_admin",
    name: "Нигора Каримова",
    email: "admin@aether.uz",
    phone: "+998 90 100 00 01",
    avatar: "",
    tier: "Админ",
    role: "ADMIN",
    status: "active",
    password: "admin",
    createdAt: "2025-03-12T10:00:00.000Z",
  },
  {
    id: "usr_courier",
    name: "Жасур Рахимов",
    email: "courier@aether.uz",
    phone: "+998 90 200 00 02",
    avatar: "",
    tier: "Курьер",
    role: "COURIER",
    status: "active",
    password: "courier",
    createdAt: "2025-06-02T10:00:00.000Z",
  },
  {
    id: "usr_client",
    name: "Анна Соколова",
    email: "user@aether.uz",
    phone: "+998 90 300 00 03",
    avatar: "",
    tier: "Стандарт",
    role: "USER",
    status: "active",
    password: "user",
    createdAt: "2026-01-18T10:00:00.000Z",
  },
];

interface UserState {
  isAuthenticated: boolean;
  user: AppUser;
  accounts: AppUser[];
  walletBalance: number;
  transactions: WalletTransaction[];
  addresses: AddressItem[];
  notifications: AppNotification[];
  currency: string;
  language: Locale;
  isSearchOpen: boolean;
  activeTab: string;

  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "USER" | "COURIER";
  }) => { ok: boolean; error?: string };
  loginAs: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateAccountRole: (id: string, role: UserRole) => void;
  toggleAccountStatus: (id: string) => void;
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
    description: "Пополнение карты",
    timestamp: "2 часа назад",
    status: "COMPLETED",
  },
  {
    id: "tx_2",
    type: "ORDER_PAYMENT",
    amount: -43.5,
    description: "Оплата заказа AETH-982XF",
    timestamp: "12 мин назад",
    status: "COMPLETED",
  },
  {
    id: "tx_3",
    type: "CASHBACK",
    amount: 8.7,
    description: "Кэшбэк по заказу",
    timestamp: "Вчера",
    status: "COMPLETED",
  },
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif_1",
    title: "Курьер выехал",
    message: "Жасур будет у адреса примерно через 12 минут.",
    timestamp: "4м назад",
    read: false,
    type: "ORDER",
  },
  {
    id: "notif_2",
    title: "Заказ принят",
    message: "Документы с Мирабада забрали. Едем в Юнусабад.",
    timestamp: "1ч назад",
    read: false,
    type: "SECURITY",
  },
  {
    id: "notif_3",
    title: "Баланс пополнен",
    message: "500 000 сум зачислены на счёт.",
    timestamp: "2ч назад",
    read: true,
    type: "WALLET",
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: GUEST_USER,
      accounts: SEED_USERS,
      walletBalance: 1465.2,
      transactions: INITIAL_TRANSACTIONS,
      addresses: PRESET_ADDRESSES,
      notifications: INITIAL_NOTIFICATIONS,
      currency: "USD",
      language: "ru",
      isSearchOpen: false,
      activeTab: "overview",

      login: (email, password) => {
        const match = get().accounts.find(
          (a) => a.email.toLowerCase() === email.trim().toLowerCase()
        );
        if (!match || match.password !== password) {
          return { ok: false, error: "auth.error" };
        }
        if (match.status === "blocked") {
          return { ok: false, error: "auth.error" };
        }
        set({ isAuthenticated: true, user: match });
        return { ok: true };
      },

      register: ({ name, email, phone, password, role }) => {
        const exists = get().accounts.some(
          (a) => a.email.toLowerCase() === email.trim().toLowerCase()
        );
        if (exists) return { ok: false, error: "auth.exists" };
        if (password.length < 6) return { ok: false, error: "auth.minPwd" };

        const created: AppUser = {
          id: `usr_${Date.now()}`,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          avatar: "",
          tier: "Стандарт",
          role,
          status: "active",
          password,
          createdAt: new Date().toISOString(),
        };

        set((s) => ({
          accounts: [created, ...s.accounts],
          isAuthenticated: true,
          user: created,
        }));
        return { ok: true };
      },

      loginAs: (role) => {
        const match =
          get().accounts.find((a) => a.role === role && a.status === "active") ||
          SEED_USERS.find((a) => a.role === role);
        if (!match) return;
        set({ isAuthenticated: true, user: match });
      },

      logout: () => set({ isAuthenticated: false, user: GUEST_USER }),

      switchRole: (role) =>
        set((s) => ({
          user: { ...s.user, role },
          accounts: s.accounts.map((a) =>
            a.id === s.user.id ? { ...a, role } : a
          ),
        })),

      updateAccountRole: (id, role) =>
        set((s) => ({
          accounts: s.accounts.map((a) => (a.id === id ? { ...a, role } : a)),
          user: s.user.id === id ? { ...s.user, role } : s.user,
        })),

      toggleAccountStatus: (id) =>
        set((s) => ({
          accounts: s.accounts.map((a) =>
            a.id === id
              ? { ...a, status: a.status === "active" ? "blocked" : "active" }
              : a
          ),
        })),

      topUpWallet: (amount) =>
        set((s) => ({
          walletBalance: s.walletBalance + amount,
          transactions: [
            {
              id: `tx_${Date.now()}`,
              type: "TOPUP",
              amount,
              description: "Пополнение баланса",
              timestamp: "Только что",
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
              timestamp: "Только что",
              status: "COMPLETED",
            },
            ...s.transactions,
          ],
        }));
        return true;
      },

      addAddress: (addr) =>
        set((s) => ({
          addresses: [...s.addresses, { ...addr, id: `addr_${Date.now()}` }],
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
      setLanguage: (language) =>
        set({ language: isLocale(language) ? language : "ru" }),
      setIsSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
    }),
    {
      name: "aether-user-storage",
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<UserState>;
        const langRaw = String(p.language || current.language || "ru").toLowerCase();
        const persistedUser = p.user;
        return {
          ...current,
          ...p,
          language: isLocale(langRaw) ? langRaw : "ru",
          accounts: p.accounts?.length ? p.accounts : current.accounts,
          isAuthenticated: Boolean(p.isAuthenticated),
          user: persistedUser
            ? {
                ...GUEST_USER,
                ...persistedUser,
                password: persistedUser.password || "",
                status: persistedUser.status || "active",
              }
            : current.user,
        };
      },
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        accounts: state.accounts,
        walletBalance: state.walletBalance,
        addresses: state.addresses,
        currency: state.currency,
        language: state.language,
      }),
    }
  )
);
