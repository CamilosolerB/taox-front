import { ClipboardCheck, TriangleAlert, ArrowRightLeft, Factory} from "lucide-react"
export const cardMainData = [
    {
        icon: ClipboardCheck,
        text: "Total productos",
        value: "1.284",
        color: "blue",
        isDash: true,
        colorDash: "green",
        valueDash: "+12%"
    },
    {
        icon: TriangleAlert,
        text: "Stock bajo",
        value: "18",
        color: "amber",
        isDash: true,
        colorDash: "red",
        valueDash: "Alerta"
    },
    {
        icon: ArrowRightLeft,
        text: "Movimientos hoy",
        value: "42",
        color: "green",
        isDash: false
    },
    {
        icon: Factory,
        text: "Ubicaciones activas",
        value: "24",
        color: "orange",
        isDash: false
    }
]