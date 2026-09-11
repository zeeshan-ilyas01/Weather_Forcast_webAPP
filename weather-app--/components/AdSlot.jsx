export default function AdSlot({ label = "Ad space" }) {
  return (
    <div
      style={{
        border: "1px dashed rgba(255,255,255,0.4)",
        borderRadius: 12,
        padding: 16,
        textAlign: "center",
        margin: "16px 0",
      }}
    >
      <p style={{ fontSize: 12, opacity: 0.6, margin: 0 }}>{label}</p>
      {/*
        Once approved for AdSense, replace this placeholder div's contents
        with your actual ad unit code (usually a <script> + <ins> tag
        AdSense gives you per ad slot). Every page using <AdSlot> updates
        automatically since they all import from this one file.
      */}
    </div>
  );
}