/* eslint-disable @stylistic/semi */

import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod'

const nonNegNumber = z
  .number({ message: 'Dieses Feld ist erforderlich.' })
  .nonnegative('Bitte geben Sie nur Nummern.');

const nonEmpty = z.string({ message: 'Dieses Feld ist erforderlich.' }).min(1);

export const validationSchema = toTypedSchema(
  z
    .object({
      sequenceNumber: nonNegNumber,
      sleeveNumber: nonNegNumber,
      design: nonEmpty,
      color: nonEmpty,
      manufacturer: nonEmpty,
      gear: nonNegNumber,
      circumference: nonNegNumber,
      slot: nonNegNumber,
      width: nonNegNumber,
      warehouse: nonEmpty,
      type: nonEmpty,
      condition: nonEmpty,
    })
    .passthrough(),
);
