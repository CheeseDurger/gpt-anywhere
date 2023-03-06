import { optionsFactory } from "../02-ports/output/Options";

export class OpenOptionsUseCase {

  public handle() {
    optionsFactory().open();
  };

};