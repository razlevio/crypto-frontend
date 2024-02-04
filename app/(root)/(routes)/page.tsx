import Image from "next/image";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/date-table";

export default async function RootPage() {
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
  const API_ENDPOINT = `${APP_URL}/api/last`;

  let data = null;

  try {
    // Make a fetch request to your endpoint
    const res = await fetch(API_ENDPOINT);

    // Check if the request was successful
    if (!res.ok) {
      // Handle the error case, perhaps by throwing an error or returning a default value
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    // Parse the JSON response
    data = await res.json();
  } catch (error) {
    console.error("Failed to fetch data from /api/last", error);
    return <h1>Problem Fetching Data</h1>
  }

  return (
    <main className="mx-auto max-w-7xl p-6 sm:px-4">
      <div className="flex items-center justify-center">
        <Image
          src="./logo.svg"
          alt="logo"
          width={250}
          height={250}
          className="size-20"
        />
      </div>
      <div className="container mx-auto py-10">
        <h1 className="mb-10 text-center text-3xl font-bold">
          Last Crypto Rates
        </h1>
        <DataTable columns={columns} data={data.rates} />
      </div>
    </main>
  );
}
