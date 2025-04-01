import { LocalMessage } from "../../../types/message";
import { removeDuplicates } from "./remove-duplicates";
import { sortMessages } from "./sort-messages";

export function addMessages(
  oldMessages: LocalMessage[],
  newMessages: LocalMessage[]
) {
  return sortMessages(removeDuplicates([...oldMessages, ...newMessages]));
}
