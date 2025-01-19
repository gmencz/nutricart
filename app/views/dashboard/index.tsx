import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Metrix | Dashboard" }];
}

export default function Home() {
  return (
    <div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, molestias
        totam provident quidem laudantium adipisci illo impedit fugit quos
        accusamus reiciendis? Aliquid architecto iusto esse magnam error,
        veritatis nemo magni.
      </p>
    </div>
  );
}
