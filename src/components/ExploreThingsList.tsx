import * as React from "react";
import { ThingPreview } from "./ThingPreview";
import { Separator } from "./Separator";
import { FirebaseDatabaseNode } from "@react-firebase/database";
import { getFirebasePath } from "../utils/get-firebase-path";

export const ExploreThingsListUI = ({
  thingsIds,
  thingsData,
  onDelete = () => {}
}) => {
  return (
    <div data-testid="explore-things-list">
      {thingsIds.map((thingId, i) => (
        <div key={thingId}>
          <ThingPreview
            thingId={thingId}
            thingData={thingsData[i]}
            onDelete={onDelete}
          />
          <Separator vertical space={10} />
        </div>
      ))}
    </div>
  );
};

export const ExploreThingsList = ({
  initial: { thingsIds: initTi, thingsData: initTd }
}) => {
  return (
    <FirebaseDatabaseNode path={getFirebasePath(`public_things`)} isList>
      {({ value: things }) => {
        if (Array.isArray(things) === false)
          return <ExploreThingsListUI thingsIds={initTi} thingsData={initTd} />;
        const thingsIds = things.map(t => t.key);
        const thingsData = things.map(t => t.data);
        return (
          <ExploreThingsListUI thingsIds={thingsIds} thingsData={thingsData} />
        );
      }}
    </FirebaseDatabaseNode>
  );
};
