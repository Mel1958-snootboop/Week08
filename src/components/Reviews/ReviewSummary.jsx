// src/components/Reviews/ReviewSummary.jsx
import { gemini20Flash, googleAI } from "@genkit-ai/googleai";

// GeminiSummary component
import { genkit } from "genkit";

// Import necessary Firebase functions
import { getReviewsByRestaurantId } from "@/src/lib/firebase/firestore.js";

// Server-side function to fetch and summarize reviews using Gemini
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp";

// Firebase imports
import { getFirestore } from "firebase/firestore";

// GeminiSummary component that summarizes reviews for a restaurant
export async function GeminiSummary({ restaurantId }) {
  return (
    <div className="restaurant__review_summary">
      <p>TODO: summarize reviews</p>
    </div>
  );
}

// Skeleton component to show while the summary is loading
export function GeminiSummarySkeleton() {
  return (
    <div className="restaurant__review_summary">
      <p>✨ Summarizing reviews with Gemini...</p>
    </div>
  );
}
