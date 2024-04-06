import z from 'zod'

/* The ValidacionGenerica class is a TypeScript class that provides generic validation methods for a
given schema. */
export class ValidacionGenerica {
    private schema: z.AnyZodObject

    /**
     * The constructor function takes a Zod schema object as a parameter.
     * @param esquema - The parameter "esquema" is of type "z.AnyZodObject". It is likely a schema
     * object used for data validation and type checking.
     */
    constructor(esquema: z.AnyZodObject) {
        this.schema = esquema
    }

    /**
     * The function "validateEsquema" takes an object as input and uses a schema to safely parse and
     * validate the object.
     * @param {any} object - The "object" parameter is of type "any", which means it can accept any
     * type of value.
     * @returns the result of parsing the object using the schema.
     */
    validateEsquema(object: any) {
        return this.schema.safeParse(object)
    }

    /**
     * The function "validateParcialEsquema" validates an object against a partial schema in
     * TypeScript.
     * @param {any} object - The `object` parameter is any JavaScript object that you want to validate
     * against a schema.
     * @returns the result of parsing the object using the partial schema.
     */
    validateParcialEsquema(object: any) {
        return this.schema.partial().safeParse(object)
    }
}