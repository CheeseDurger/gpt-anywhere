import { optionsFactory } from "../02-ports/output/Options";

export class OpenOptionsUseCase {

  public async handle(): Promise<void> {
    await optionsFactory().open();
  };

};