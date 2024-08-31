import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import colors from "tailwindcss/colors";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from "recharts";

export function RevenueChart() {
  const data = [
    {
      date: "10-12",
      revenue: 1200,
    },
    {
      date: "11-12",
      revenue: 1000,
    },
    {
      date: "12-12",
      revenue: 1200,
    },
    {
      date: "13-12",
      revenue: 1200,
    },
    {
      date: "14-12",
      revenue: 1200,
    },
    {
      date: "15-12",
      revenue: 1500,
    },
    {
      date: "16-12",
      revenue: 800,
    },
    {
      date: "17-12",
      revenue: 1200,
    },
  ];

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            {/*    eixo Y */}
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            {/* Aqui é o eixo X, e se passa qual campo vai aparecer nos dados do eixo */}
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />            

            {/* Linhas "guia" do gráfico */}
            <CartesianGrid vertical={false} className="stroke-muted"/>

            {/* O que forma a linha, o data key é o que faz a linha descer ou subir  /*/}
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet[400]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
