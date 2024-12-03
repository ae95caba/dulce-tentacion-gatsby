import React, { useState, useEffect } from "react";
import { toZonedTime } from "date-fns-tz";

export default function OpenCloseSign() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      // Set the time zone to Argentina
      const timeZone = "America/Argentina/Buenos_Aires";
      const argentinaTime = toZonedTime(new Date(), timeZone); // Current time in Argentina

      // Define your store's opening hours
      const weekdaysOpeningHour = 20; // Monday to Friday opening hour
      const weekendsOpeningHour = 13; // Saturday and Sunday opening hour
      const closingHour = 24; // Closing hour for both weekdays and weekends

      // Get the current day and hour
      const currentDay = argentinaTime.getDay(); // Returns day index (0: Sunday, 6: Saturday)
      const currentHour = argentinaTime.getHours(); // Current hour

      // Determine if the store is open based on the current time and day
      const isStoreOpen =
        (currentDay >= 1 &&
          currentDay <= 5 &&
          currentHour >= weekdaysOpeningHour) ||
        ((currentDay === 6 || currentDay === 0) &&
          currentHour >= weekendsOpeningHour);

      // Log the results for debugging
      /* 
      console.log(`is open is : ${isStoreOpen}`);
      console.log(`current day and hour is ${currentDay} , ${currentHour}`);
      */

      setIsOpen(isStoreOpen);
    };

    // Update the status initially
    updateStatus();

    // Set up an interval to update the status every minute (adjust as needed)
    const intervalId = setInterval(updateStatus, 60000); // 60000 milliseconds = 1 minute

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="open-close-sign">
      <p>{isOpen ? "Abierto" : "Cerrado"}</p>
    </div>
  );
}
