import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    id: "dashboard",
    title: "Консоль",
    type: "item",
    icon: <Icon.Home size={20} />,
    navLink: "/1/2/"
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
    navLink: "/1/2/charts"
  },
  {
    id: "transaction",
    title: "Заказы",
    type: "item",
    icon: <Icon.ShoppingCart size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/1/2/transaction"
  },
  {
    id: "products",
    title: "Пакеты",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/1/2/products"
  },
  {
    id: "forms",
    title: "Ответы на формы обратной связи",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/1/2/forms"
  },
  {
    id: "users",
    title: "Пользователи",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/1/2/users"
  },
  {
    id: "logs",
    title: "Лог изменений",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin"],
    navLink: "/1/2/logs"
  },
  {
    id: "admins",
    title: "Администраторы",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin"],
    navLink: "/1/2/admins"
  },
  {
    id: "settings",
    title: "Настройки",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin"],
    navLink: "/1/2/settings"
  },
]

export default navigationConfig
