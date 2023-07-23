"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Country = {
    code: string
    name: string
}
export const CountryColumns: ColumnDef<Country>[] = [
    {
        accessorKey: "code",
        header: "Kod",
    },
    {
        accessorKey: "name",
        header: "Ad",
    }
]