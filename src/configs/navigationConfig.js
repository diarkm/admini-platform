import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    id: "dashboard",
    title: "Консоль",
    type: "item",
    icon: <Icon.Home size={20} />,
    navLink: "/"
  },
  {
    type: "groupHeader",
    groupTitle: "Система"
  },
  {
    id: "charts",
    title: "Отчеты",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/charts"
  },
  {
    id: "transaction",
    title: "Заказы",
    type: "item",
    icon: <Icon.ShoppingCart size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/transaction"
  },
  {
    id: "products",
    title: "Пакеты",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/products"
  },
  {
    id: "forms",
    title: "Ответы на формы обратной связи",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/forms"
  },
  {
    id: "users",
    title: "Пользователи",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/users"
  },
  {
    id: "logs",
    title: "Лог изменений",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin"],
    navLink: "/logs"
  },
  {
    id: "admins",
    title: "Администраторы",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin"],
    navLink: "/admins"
  },
  {
    id: "settings",
    title: "Настройки",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin"],
    navLink: "/settings"
  },
]

export default navigationConfig
