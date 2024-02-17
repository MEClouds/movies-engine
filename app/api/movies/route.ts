import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import {
  makeProviders,
  makeStandardFetcher,
  targets,
} from "@movie-web/providers";
type MovieMedia = {
  type: "movie";
  title: string;
  releaseYear: number;
  tmdbId: string;
};
// Define your custom response type
type CustomResponse = {
  data: any; // Define your data type
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: Record<string, any>;
};
// Your existing function
async function handlePostRequest(req: NextApiRequest): Promise<CustomResponse> {
  try {
    const { title, releaseYear, tmdbId } = await req.json();
    console.log(title);
    // Create an instance of the providers library
    const providers = makeProviders({
      fetcher: makeStandardFetcher(fetch),
      target: targets.NATIVE,
    });
    // Fetch data from TMDB using the provided movie information
    const media: MovieMedia = {
      type: "movie",
      title,
      releaseYear,
      tmdbId,
    };

    const output = await providers.runAll({
      media,
    });
    console.log(output?.stream.qualities);
    return {
      data: output?.stream.qualities["720"].url,
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json",
      },
      config: {},
    };
  } catch (error) {
    console.error("Error fetching movie URL:", error);
    return {
      data: { error: "Internal Server Error" },
      status: 500,
      statusText: "Internal Server Error",
      headers: {
        "Content-Type": "application/json",
      },
      config: {},
    };
  }
}

export async function POST(req: NextApiRequest) {
  const response = await handlePostRequest(req);
  return new NextResponse(response.data, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
