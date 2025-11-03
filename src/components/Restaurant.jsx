"use client";

// This components shows one individual restaurant
// It receives data from src/app/restaurant/[id]/page.jsx

// and uses Firestore's real-time capabilities to update the data as it changes
import { React, useState, useEffect, Suspense } from "react";

// Dynamic import to reduce initial bundle size
import dynamic from "next/dynamic";

// Firestore helper to get real-time updates
import { getRestaurantSnapshotById } from "@/src/lib/firebase/firestore.js";

// Custom hook to get the current user
import { useUser } from "@/src/lib/getUser";

// Component to show restaurant details
import RestaurantDetails from "@/src/components/RestaurantDetails.jsx";

// Firebase storage helper to upload restaurant images
import { updateRestaurantImage } from "@/src/lib/firebase/storage.js";

// Dynamically import ReviewDialog to reduce initial bundle size
const ReviewDialog = dynamic(() => import("@/src/components/ReviewDialog.jsx"));

// Restaurant component
export default function Restaurant({
  id,
  initialRestaurant,
  initialUserId,
  children,
}) {
  const [restaurantDetails, setRestaurantDetails] = useState(initialRestaurant);
  const [isOpen, setIsOpen] = useState(false);

  // The only reason this component needs to know the user ID is to associate a review with the user, and to know whether to show the review dialog
  const userId = useUser()?.uid || initialUserId;
  const [review, setReview] = useState({
    rating: 0,
    text: "",
  });

  // handle changes to the review form
  const onChange = (value, name) => {
    setReview({ ...review, [name]: value });
  };

  // handle restaurant image upload
  async function handleRestaurantImage(target) {
    const image = target.files ? target.files[0] : null;
    if (!image) {
      return;
    }

    const imageURL = await updateRestaurantImage(id, image);
    setRestaurantDetails({ ...restaurantDetails, photo: imageURL });
  }

  // handle closing the review dialog
  const handleClose = () => {
    setIsOpen(false);
    setReview({ rating: 0, text: "" });
  };

  useEffect(() => {
    return getRestaurantSnapshotById(id, (data) => {
      setRestaurantDetails(data);
    });
  }, [id]);

  return (
    <>
      <RestaurantDetails
        restaurant={restaurantDetails}
        userId={userId}
        handleRestaurantImage={handleRestaurantImage}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        {children}
      </RestaurantDetails>
      {userId && (
        <Suspense fallback={<p>Loading...</p>}>
          <ReviewDialog
            isOpen={isOpen}
            handleClose={handleClose}
            review={review}
            onChange={onChange}
            userId={userId}
            id={id}
          />
        </Suspense>
      )}
    </>
  );
}
