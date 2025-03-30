import { useEffect, useState } from "react";
import { EmptyStateMessage } from "../empty-state-message/empty-state-message.tsx";

export const MyFavourites = () => {
  const [favouritesCount, setFavouritesCount] = useState(0);

  const handleFavouritesCount = (count: number) => setFavouritesCount(count);

  // имитация сервера, заменить any
  const getFavourites = async (value: any) => {
    console.log(value);
    handleFavouritesCount(0);
  };

  useEffect(() => {
    // заменить на нормальный value
    getFavourites(true);
  }, []);

  return (
    <section>
      {favouritesCount === 0 && <EmptyStateMessage heading="Избранное" />}
    </section>
  );
};
