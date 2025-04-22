import React from "react";
import BookDeposButton from "../ui/BookDeposButton";
import { router } from "expo-router";

export default function BookDeposSqliteBackButton({
  text = "Вернуться к книгам",
}: {
  text?: string;
}) {
  return (
    <BookDeposButton
      text={text}
      func={() => router.replace("/BookDeposSqlite")}
    />
  );
}
