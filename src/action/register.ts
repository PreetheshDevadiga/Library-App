"use server"

import bcrypt from 'bcrypt';
import { db } from '@/db/db';
import { MemberRepository } from '../repository/member.repository';
import { IMemberBase, RegisterSchemaBase } from '../schemas';

export interface State {
  errors?: { [key: string]: string[] };
  message?: string;
}

const memberRepo = new MemberRepository(db);

export const register = async (prevState: State, formData: FormData): Promise<{ message: string; errors?: { [key: string]: string[] }; error?: string }> => {
  const data = Object.fromEntries(formData.entries());
 console.log(data);
  const validateFields = RegisterSchemaBase.safeParse({
    firstName: formData.get("firstName")?.toString(),
    lastName: formData.get("lastName")?.toString(),
    phone: Number(formData.get("phone")),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    confirmPassword: formData.get("confirmPassword")?.toString()
  });

  if (!validateFields.success) {
    return { message: "", errors: {} };
  }

  const { password, confirmPassword } = validateFields.data;
  if (password !== confirmPassword) {
    return {
      message: "",
      errors: { confirmPassword: ["Passwords do not match"] }
    };
  }

  const { firstName, lastName, phone, email } = validateFields.data;

  // Ensure all required fields are present
  if (!firstName || !lastName || !phone || !email || !password) {
    console.log("All fields are required");
    return { message: "All fields are required" };
  }

  try {
    const existingUser = await memberRepo.getByEmail(email);
    if (existingUser) {
      console.log("User already exists.");
      return { message: "User already exists." };
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create the new user object
    const newUser: IMemberBase = {
      firstName,
      lastName,
      phone,
      address: '', // Default empty address
      email,
      password: hashedPwd,
    };

    // Save the new user to the repository
    const createdUser = await memberRepo.create(newUser);

    console.log(`User ${createdUser.email} created successfully!`);
    return { message: "Registration successful" };
  } catch (error: any) {
    console.log("Error during registration:", error);
    return { message: "Error during registration", error: error.message };
  }
};
