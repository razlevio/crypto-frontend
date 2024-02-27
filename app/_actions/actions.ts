"use server";

import { revalidatePath } from "next/cache";

/**
 * Triggers a revalidation of the root path ("/") in the Next.js application.
 * This can be useful for updating the page when the underlying data changes.
 */
export async function revalidateAction() {
  revalidatePath("/");
  console.log("Revalidation triggered for the root path");
}
