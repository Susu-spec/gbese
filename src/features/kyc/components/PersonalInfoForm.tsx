import { DatePicker, FormFieldWrapper } from "@/components/shared/form"
import { FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { personalInfoSchema } from "../kycSchemas"
import { useState } from "react"
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city"
import { Select, SelectTrigger } from "@/components/ui/select"
import type { Country, State } from "@/utils/types"
import { Button } from "@/components/ui/button"
import type { PersonalInfoFormValues } from "@/features/kyc/types"
import { useKyc } from "../hooks/useKyc"
import { Spinner } from "@/components/ui/spinner"

const defaultValues: PersonalInfoFormValues = {
    dob: null,
    country: "",
    city: "",
    state: "",
    occupation: "",
    gender: "",
    address: "",
    postalCode: ""
}

export default function PersonalInfoForm() {
    const [country, setCountry] = useState<Country | null>(null);
    const [currentState, setCurrentState] = useState<State | null>(null);
    const { uploadPersonalInformation } = useKyc();

    const form = useForm({
        defaultValues,
        validators: {
            onSubmit: personalInfoSchema
        },
        onSubmit: ({ value }) => {
            if (!value.dob) return;
            const isoDob = value.dob.toISOString()
            uploadPersonalInformation.mutate({
                dob: isoDob,
                country: value.country,
                city: value.city,
                state: value.state,
                occupation: value.occupation,
                gender: value.gender,
                address: value.address,
                postal_code: value.postalCode
            })
        }
    });

    return (
        <form
            id="personal-info-form"
            onSubmit={(e) => {
                e.preventDefault()
            }}
            className="flex flex-col gap-10 w-full"
        >
            <FieldGroup className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <FormFieldWrapper
                        form={form}
                        label="Gender"
                        name="gender"
                    >
                        {(field, isInvalid) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="text"
                                placeholder="Please input your gender"
                                className={`${isInvalid ? 'border-red-500' : ''} text-sm py-4 px-4 rounded-md bg-gbese-background`}
                            />
                        )}
                    </FormFieldWrapper>
                    <FormFieldWrapper
                        form={form}
                        label="Occupation"
                        name="occupation"
                    >
                        {(field, isInvalid) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="text"
                                placeholder="Please input your occupation"
                                className={`${isInvalid ? 'border-red-500' : ''} text-sm py-4 px-4 rounded-md cursor-pointer bg-gbese-background`}
                            />
                        )}
                    </FormFieldWrapper>
                </div>     
                 <FormFieldWrapper
                    form={form}
                    label=""
                    name="dob"
                >
                    {(field, isInvalid) => (
                        <DatePicker
                            name={field.name}
                            label="Date of Birth"
                            placeholder="DD-MM-YYYY"
                            value={field.state.value}
                            isInvalid={isInvalid}
                            onChange={(date) => field.handleChange(date)}
                            error={field.state.meta.errors.join(', ')}
                        />
                    )}
                </FormFieldWrapper> 
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <FormFieldWrapper
                        form={form}
                        label="Country"
                        name="country"
                    >
                        {(field, isInvalid) => (
                            <CountrySelect
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(value) => {
                                    if ("target" in value) {
                                        field.handleChange(value.target.value);
                                    } else {
                                        field.handleChange(value.name);
                                        setCountry(value);
                                    }
                                }}
                                onBlur={field.handleBlur}
                                placeHolder="Select a country"
                                inputClassName="focus:outline-0 text-sm"
                                containerClassName={`w-full ${isInvalid ? "border-red-500" : "border-input"} border flex items-center rounded-md cursor-pointer bg-gbese-background`}
                            />
                        )}
                    </FormFieldWrapper>
                    <FormFieldWrapper
                        form={form}
                        label="State"
                        name="state"
                    >
                        {(field, isInvalid) => {
                            return (country && country.hasStates)  ? (
                                <StateSelect
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    countryid={country.id}
                                    onChange={(value) => {
                                        if ("target" in value) {
                                            field.handleChange(value.target.value);
                                        } else {
                                            field.handleChange(value.name);
                                            setCurrentState(value);
                                        }
                                    }}
                                    onBlur={field.handleBlur}
                                    placeHolder="Select your state"
                                    inputClassName="focus:outline-0 text-sm"
                                    containerClassName={`w-full ${isInvalid ? "border-red-500" : "border-input"} border flex items-center rounded-md cursor-pointer bg-gbese-background `}
                                />
                                ) : (
                                <Select disabled>
                                    <SelectTrigger className="w-full truncate py-4! h-fit! px-3 rounded-md border-gbese-grey-400 text-gbese-grey-400 cursor-default">
                                        {!country?.hasStates ?
                                            <span>No states available.</span> :
                                            <span>Select a country first</span>
                                        }
                                    </SelectTrigger>
                                </Select>
                            );
                        }}
                    </FormFieldWrapper>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <FormFieldWrapper
                        form={form}
                        label="City"
                        name="city"
                    >
                        {(field, isInvalid) => {
                            return (currentState && country) ? (
                                <CitySelect
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    countryid={country.id}
                                    stateid={currentState.id}
                                    onChange={(value) => {
                                        if ("target" in value) {
                                            field.handleChange(value.target.value);
                                        } else {
                                            field.handleChange(value.name);
                                        }
                                    }}
                                    onBlur={field.handleBlur}
                                    placeHolder="Select your city"
                                    inputClassName="focus:outline-0 text-sm"
                                    containerClassName={`w-full ${isInvalid ? "border-red-500" : "border-input"} border flex items-center rounded-md bg-gbese-background`}
                                />
                                ) : (
                                <Select disabled>
                                    <SelectTrigger className="w-full py-4! h-fit! px-3 rounded-md border-gbese-grey-400 text-gbese-grey-400 cursor-default">
                                        <span>Select a state first</span>
                                    </SelectTrigger>
                                </Select>
                            );
                        }}
                    </FormFieldWrapper>
                    <FormFieldWrapper
                        form={form}
                        label="Address"
                        name="address"
                    >
                        {(field, isInvalid) => (
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="text"
                                placeholder="Please input your address"
                                className={`${isInvalid ? 'border-red-500' : ''} bg-gbese-background text-sm py-4 px-4 rounded-md`}
                            />
                        )}
                    </FormFieldWrapper>
                </div>
                <FormFieldWrapper
                    form={form}
                    label="Postal Code"
                    name="postalCode"
                >
                    {(field, isInvalid) => (
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="text"
                            placeholder="Please input your postal code"
                            className={`${isInvalid ? 'border-red-500' : ''} bg-gbese-background text-sm py-4 px-4 rounded-md`}
                        />
                    )}
                </FormFieldWrapper>
            </FieldGroup>
            <div className="w-full flex justify-end">
                <Button
                    variant={!form.state.isValid ? "secondary" : "default"} 
                    className="w-full md:w-fit py-3 px-6 h-fit"
                >
                    {uploadPersonalInformation.isPending ?
                        <span className="flex items-center gap-1">
                            <span>Saving...</span>
                            <Spinner />
                        </span> 
                            : 
                        "Next"
                    }
                </Button>
            </div>
        </form>
    )
}