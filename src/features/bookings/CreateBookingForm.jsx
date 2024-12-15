import { useRef } from "react";
import { useForm } from "react-hook-form";
import { HiUserCircle } from "react-icons/hi2";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Accordion from "../../ui/Accordion";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import { useCabins } from "../cabins/useCabins";
import { useNewBooking } from "./useNewBooking";

function CreateBookingForm({ onCloseModal }) {
  const { isLoading, cabins } = useCabins();
  const selectRef = useRef();

  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { addNewBooking, isCreating } = useNewBooking();

  function onBookingSubmit(data) {
    const guestData = {
      fullName: data.fullName,
      email: data.email,
      nationality: data.nationality,
      nationalID: data.nationalId,
    };

    const bookingData = {
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      numNights: Number(data.numNights),
      numGuests: Number(data.numGuests),
      cabinPrice: cabins.find((cabin) => cabin.id === Number(data.cabinId))
        ?.regularPrice,
      totalPrice: 1500,
      status: "unconfirmed",
      cabinId: Number(data.cabinId),
    };

    console.log(bookingData);
    addNewBooking(
      { newGuest: guestData, newBooking: bookingData },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <Form onSubmit={handleSubmit(onBookingSubmit)} type="modal">
        <Accordion
          icon={<HiUserCircle />}
          heading="Guest details"
          shortText="Add guest details"
        >
          <FormRow label="Full name" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              {...register("fullName", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
          </FormRow>
          <FormRow label="Email" error={errors?.email?.message}>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
              disabled={isCreating}
            />
          </FormRow>
          <FormRow label="Nationality" error={errors?.nationality?.message}>
            <Input
              type="text"
              id="nationality"
              {...register("nationality", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
          </FormRow>
          <FormRow label="National id" error={errors?.nationalId?.message}>
            <Input
              type="number"
              id="nationalId"
              {...register("nationalId", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
          </FormRow>

          <FormRow>
            <Button variation="secondary" type="reset">
              Reset
            </Button>
          </FormRow>
        </Accordion>

        <Accordion heading="Booking details" shortText="Add booking details">
          <FormRow label="Start date" error={errors?.startDate?.message}>
            <Input
              type="date"
              id="startDate"
              {...register("startDate", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
          </FormRow>
          <FormRow label="End date" error={errors?.endDate?.message}>
            <Input
              type="date"
              id="endDate"
              {...register("endDate", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
          </FormRow>
          <FormRow label="# nights" error={errors?.numNights?.message}>
            <Input
              type="number"
              id="numNights"
              {...register("numNights", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
          </FormRow>
          <FormRow label="# guests" error={errors?.numGuests?.message}>
            <Input
              type="number"
              id="numGuests"
              {...register("numGuests", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
          </FormRow>
          <FormRow label="Cabin" error={errors?.cabinId?.message}>
            <Select
              ref={selectRef}
              options={cabins.map((cabin) => ({
                label: `cabin ${cabin.name}`,
                value: cabin.id,
              }))}
              id="cabinId"
              {...register("cabinId", {
                required: "This field is required",
              })}
              disabled={isCreating}
            />
          </FormRow>
        </Accordion>

        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal()}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button disabled={isCreating}>Submit</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateBookingForm;
