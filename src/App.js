import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";

function App() {
  const [userId, setUserId] = useState("user_123");

  // Set User Properties (once)
  useEffect(() => {
    ReactGA.set({
      user_id: userId,
      user_type: "tester",
      membership: "premium",
    });
  }, [userId]);

  const trackEvent = (
    action,
    label,
    value = null,
    category = "Button Interaction",
  ) => {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>GA4 Demo - Test All Features</h1>
      <p>Click buttons below and check your GA4 Real-time report</p>

      <div style={{ display: "grid", gap: "15px", maxWidth: "600px" }}>
        {/* Basic Button Click */}
        <button onClick={() => trackEvent("Click", "Basic Button", 1)}>
          Basic Button Click
        </button>

        {/* Different Categories */}
        <button
          onClick={() =>
            trackEvent("CTA Click", "Hero Section", 5, "Engagement")
          }
        >
          Hero CTA Button
        </button>

        <button
          onClick={() => trackEvent("Download", "PDF Report", 10, "Content")}
        >
          Download Report
        </button>

        {/* E-commerce Style Events */}
        <button
          onClick={() => {
            trackEvent("Add to Cart", "Product A", 1, "Ecommerce");
            ReactGA.event({
              category: "Ecommerce",
              action: "add_to_cart",
              label: "Product A",
            });
          }}
        >
          Add to Cart
        </button>

        {/* User Identification */}
        <button
          onClick={() => {
            const newId = "user_" + Math.floor(Math.random() * 1000);
            setUserId(newId);
            ReactGA.set({ user_id: newId });
            alert("User ID changed to: " + newId);
          }}
        >
          Change User ID
        </button>

        {/* Timing Event */}
        <button
          onClick={() => {
            const start = Date.now();
            setTimeout(() => {
              const duration = Date.now() - start;
              ReactGA.event({
                category: "Performance",
                action: "Page Load Simulation",
                value: duration,
              });
            }, 800);
          }}
        >
          Simulate Slow Action (Timing)
        </button>

        {/* Scroll Tracking Simulation */}
        <button
          onClick={() => {
            trackEvent("Scroll Depth", "Reached 75%", 75, "Engagement");
          }}
        >
          Simulate 75% Scroll
        </button>

        {/* Form Submission */}
        <button
          onClick={() => {
            trackEvent("Form Submit", "Contact Form", 1, "Conversion");
          }}
        >
          Submit Form
        </button>

        {/* Exceptional Event */}
        <button
          onClick={() => {
            ReactGA.event({
              category: "Error",
              action: "Button Error Clicked",
              label: "Test Error Tracking",
              nonInteraction: false,
            });
          }}
        >
          Trigger Error Event
        </button>
      </div>

      <br />
      <br />
      <small>Check GA4 → Reports → Realtime to see events live</small>
    </div>
  );
}

export default App;
