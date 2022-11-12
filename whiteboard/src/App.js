import { useFastboard, Fastboard } from "@netless/fastboard-react";
import React from "react";

export function App() {
  const fastboard = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: "whiteboard-appid",
      region: "cn-hz", // "cn-hz" | "us-sv" | "sg" | "in-mum" | "gb-lon"
    },
    joinRoom: {
      uid: "unique_id_for_each_client",
      uuid: "room-uuid",
      roomToken: "NETLESSROOM_...",
    },
  }));

  return <Fastboard app={fastboard} />;
}
