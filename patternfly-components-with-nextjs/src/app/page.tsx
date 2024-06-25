"use client";

import { Page, PageSection, PageSectionVariants, TextContent, Text, Button, AlertGroup, Alert, AlertVariant, AlertProps, AlertActionCloseButton } from "@patternfly/react-core";

import '@patternfly/react-core/dist/styles/base.css';
import { useState } from "react";

export default function Home() {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const addAlert = () => {
    const newAlert: AlertProps = {
      key: new Date().getTime(),
      title: 'Hello!',
      variant: AlertVariant.info,
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  const removeAlert = (key: React.Key) => {
    setAlerts((prevAlerts) => [...prevAlerts.filter((alert) => alert.key !== key)]);
  };

  return (
    <>
      <Page
        additionalGroupedContent={
          <PageSection variant={PageSectionVariants.light} isWidthLimited>
            <TextContent>
              <Text component="h1">Main title</Text>
              <Text component="p">This is a full page demo.</Text>
            </TextContent>
          </PageSection>
        }
      >
        <PageSection>
          <Button variant="primary" onClick={addAlert}>Hello, world!</Button>
        </PageSection>
      </Page>
      <AlertGroup isToast isLiveRegion>
        {alerts.map(({ key, ...otherProps }) => (
          <Alert
            key={key}
            {...otherProps}
            actionClose={
              <AlertActionCloseButton onClose={() => removeAlert(key!)} />
            }
          />
        ))}
      </AlertGroup>

    </>
  );
}
