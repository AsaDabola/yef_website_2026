import "server-only";
import { cache } from "react";
import { getLocale } from "./request";
import { loadMessages, translate, type Messages } from "./messages";

/** Translator for the current request's language. */
export type T = (english: string) => string;

const messagesForRequest = cache(
  async (locale: string): Promise<Messages> => loadMessages(locale),
);

export async function getT(): Promise<T> {
  const messages = await messagesForRequest(getLocale());
  return (english: string) => translate(messages, english);
}
