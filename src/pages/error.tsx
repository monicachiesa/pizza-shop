import { Link, useRouteError } from "react-router-dom";

export interface OrderDetailsProps {}

export function NotFound() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Oooops! Algo aconteceu</h1>
      <p className="text-accent-foreground">
        {" "}
        Um erro aconteceu na aplicação, abaixo mais detalhes{" "}
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Voltar para a{" "}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          dashboard
        </Link>
      </p>
    </div>
  );
}
