import { useEffect, useState } from "react";

export type Route =
  | { name: "home" }
  | { name: "product"; id: string };

function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, "");
  if (clean.startsWith("product/")) {
    const id = clean.slice("product/".length);
    if (id) return { name: "product", id };
  }
  return { name: "home" };
}

/** Simple hash router: "#/" -> home, "#/product/<id>" -> product page. */
export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(window.location.hash)
  );

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const goHome = () => {
    window.location.hash = "#/";
  };

  const goToProduct = (id: string) => {
    window.location.hash = `#/product/${id}`;
    window.scrollTo({ top: 0 });
  };

  return { route, goHome, goToProduct };
}
