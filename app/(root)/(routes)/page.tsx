import Image from "next/image";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/date-table";
import { formatDate } from "@/lib/utils";

export default async function RootPage() {
  let data = null;

  try {
    // Fetch the latest cryptocurrency rates from the backend /last endpoint
    // For dev - use the host machine's IP address "http://lcalhost:4000/last"
    // For prod - use the service name "http://crypto-backend-service"
    const res = await fetch(`http://crypto-backend-service/last`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (!res.ok) {
      // Handle the error case, perhaps by throwing an error or returning a default value
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    // Parse the JSON response
    data = await res.json();
    if (typeof data.rates === "object" && data.rates !== null) {
      const ratesArray = Object.entries(data.rates)
        .map(([crypto, rateDetails]) => {
          // Ensure each rateDetail is an object before spreading
          if (typeof rateDetails === "object" && rateDetails !== null) {
            return { crypto, ...rateDetails };
          } else {
            console.error("Invalid rateDetails:", rateDetails);
            return null; // or handle this case as you see fit
          }
        })
        .filter((item) => item !== null); // Remove any nulls that were added due to invalid rateDetails

      data.rates = ratesArray;
    } else {
      console.error("data.rates is not an object:", data.rates);
    }
  } catch (error) {
    console.error("Failed to fetch data from /last", error);
    return <h1>Problem Fetching Data</h1>;
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
        <h1>Last update: {formatDate(data.last_update)}</h1>
        <DataTable columns={columns} data={data.rates} />
      </div>
    </main>
  );
}
