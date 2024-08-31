import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import colors from "tailwindcss/colors";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart } from "lucide-react";

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

export function PopularProductsChart() {
  const data = [
    {
      product: "Ovomaltini",
      amount: 40,
    },
    {
      product: "Strogonoff",
      amount: 45,
    },
    {
      product: "Batata frita",
      amount: 50,
    },
    {
      product: "Bacon",
      amount: 10,
    },
    {
      product: "Quatro Queijos",
      amount: 40,
    },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <CardDescription>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart data={data} style={{ fontSize: 12 }}>
            <Pie
              nameKey="product"
              data={data}
              dataKey="amount"
              cx="50%"
              cy="50%"
              innerRadius={64} //onde começa o gráfico
              outerRadius={86} //mostra onde acaba o gráfico
              strokeWidth={8}
              fill={colors.emerald[500]}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = 12 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {data[index].product.length > 12
                      ? data[index].product.substring(0, 12).concat("...")
                      : data[index].product}{" "}
                    ({value})
                  </text>
                );
              }}
            >
              {data?.map((_, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80"
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
