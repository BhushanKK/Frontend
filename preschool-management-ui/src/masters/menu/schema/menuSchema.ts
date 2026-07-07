import * as yup from "yup";

export const menuSchema = yup.object({

    parentMenuId: yup
        .number()
        .nullable(),

    menuName: yup
        .string()
        .required("Menu Name is required"),

    menuUrl: yup
        .string()
        .nullable(),

    icon: yup
        .string()
        .required("Icon is required"),

    displayOrder: yup
        .number()
        .required("Display Order is required")
        .min(1),

    isPublic: yup
        .boolean()
        .required(),

    isActive: yup
        .boolean()
        .required(),
});