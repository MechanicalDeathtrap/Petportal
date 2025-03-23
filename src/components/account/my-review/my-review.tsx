import { useEffect, useState } from "react";
import { EmptyStateMessage } from "../empty-state-message/empty-state-message.tsx";

export const MyReview = () => {
  const [reviewCount, setReviewCount] = useState(0);

  const handleReviewCount = (count: number) => setReviewCount(count);

  // имитация сервера, заменить any
  const getReview = async (value: any) => {
    console.log(value);
    handleReviewCount(0);
  };

  useEffect(() => {
    // заменить на нормальный value
    getReview(true);
  }, []);

  return (
    <section>
      {reviewCount === 0 && <EmptyStateMessage heading="Отзывы" />}
    </section>
  );
};
