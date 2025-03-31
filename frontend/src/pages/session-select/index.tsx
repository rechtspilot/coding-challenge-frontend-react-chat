import { Flex } from "antd";
import { CenterWrap } from "../../components/center-wrap";
import { SessionNew } from "./components/session-new";
import { SessionReload } from "./components/session-reload";

export const SessionSelect = () => {
  return (
    <CenterWrap>
      <Flex wrap gap="large" justify="center" align="center">
        <SessionNew />
        <SessionReload />
      </Flex>
    </CenterWrap>
  );
};
