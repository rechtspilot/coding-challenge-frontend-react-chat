import { Flex } from "antd";
import { CenterWrap } from "../../components/center-wrap";
import { SessionNew } from "../../widgets/session-new";
import { SessionReload } from "../../widgets/session-reload";

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
