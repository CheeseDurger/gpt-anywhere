import { z } from "zod";
import { DataDTO } from "../../02-ports/output/DTO";
import { StoragePort } from "../../02-ports/output/Storage";

/**
 * Get data from storage
 * @returns data from sync storage
 */
export class ChromeStorageAdapter implements StoragePort {

  public async get(): Promise<DataDTO> {
    return await chrome.storage.sync.get() as DataDTO;
  };

  public async save(data: DataDTO): Promise<void> {
    await chrome.storage.sync.set(data);
  };

  public validate(data: unknown): DataDTO {

    const index = schemas.findLastIndex( schema => schema.safeParse(data).success );

    // Guard clause : return empty data object if no schema validated
    if (index === -1) return new DataDTO();

    for (let i = index; i < migrations.length; i++) {
      const transform = migrations[i].safeParse(data);
      if (transform.success) data = transform.data;
      else return new DataDTO();
    }
    return data as DataDTO;
  };

};


/**
 * Array containing the storage schema history
 * 
 * @description this array contains the schemas sorted from version 0 to the latest version
 * For instance: `schemas[2]` is the storage schema version 2
 * 
 * @example const isDataV1: boolean = schemas[1].safeParse(data).success;
 */
const schemas = [

  z.object({
    apiKey: z.string().catch(""),
    prompts: z.array(
      z.object({
        name: z.string().catch(""),
        value: z.string().catch(""),
      })
    ).catch([]),
  }),

  z.object({
    version: z.literal(1),
    apiKey: z.string().catch(""),
    prompts: z.array(
      z.object({
        id: z.number().catch( Math.floor(10**15 * Math.random()) ),
        name: z.string().catch(""),
        value: z.string().catch(""),
      })
    ).catch([]),
  }) as z.ZodType<DataDTO>,

];

/**
 * Array containing the functions to migrate from 1 schema version to the next
 * 
 * @summary This array contains the schemas migration functions
 * sorted from the 1st migration function (migrate from version 0 to version 1)
 * to the latest migration function (migrate from version n-1 to version n)
 * 
 * @example let dataV1 = migrations[0].parse(dataV0);
 */
const migrations = [

  // Migrate from schemas[0] to schemas[1]
  schemas[0].transform( schema => {
    return {
      version: 1,
      apiKey: schema.apiKey,
      prompts: schema.prompts.map( (prompt, index: number) => {
        return {
          id: index,
          name: prompt.name,
          value: prompt.value,
        };
      }),
    };
  }),

];
