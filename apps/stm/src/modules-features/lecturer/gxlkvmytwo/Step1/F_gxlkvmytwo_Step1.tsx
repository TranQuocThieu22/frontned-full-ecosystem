'use client'

import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import {
  Box,
  Button,
  Group,
  Loader,
  TextInput
} from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import F_gxlkvmytwo_Step1_Create from "./F_gxlkvmytwo_Step1_Create";
import F_gxlkvmytwo_Step1_Modal from "./F_gxlkvmytwo_Step1_Modal";
import F_gxlkvmytwo_Step1_Read from "./F_gxlkvmytwo_Step1_Read";

interface Props {
  firstStep: () => void;
  prevStep: () => void;
  nextStep: () => void;
}

export interface I_student {
  code?: string;
  avatar?: string;
  fullName?: string;
  dateOfBirth?: Date;
  gender?: string;
  birthPlace?: string;
  email?: string;
  phone?: string;
  address?: string;
  idNumber?: string;
  idIssueDate?: Date;
  idIssuePlace?: string;
  ngayCapNhat?: Date | undefined;
  nguoiCapNhat?: string;
}

export default function F_gxlkvmytwo_Step1({ firstStep, prevStep, nextStep }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<I_student | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(true);

  const handleDebouncedSearch = useDebouncedCallback(() => {
    if (searchQuery.trim()) {
      setModalOpened(true);
      setIsSearching(true);
    }
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchQuery(value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      setModalOpened(true);
      setIsSearching(true);
      setShowCreateForm(false);
    }
  };

  const handleModalClose = () => {
    setModalOpened(false);
    setIsSearching(false);
  };

  const handleStudentSelect = (student: I_student) => {
    setSelectedStudent(student);
    setSearchQuery(student.fullName || "");
    setIsSearching(false);
    setShowCreateForm(false);
  };

  const handleAddNewClick = () => {
    setShowCreateForm(true);
    setSelectedStudent(null);
    setSearchQuery("");
  };

  const handleAddStudent = async (student: I_student) => {
    console.log("Thêm học viên mới:", student);
    return Promise.resolve();
  };

  return (
    <Box pos="relative">
      <MyFieldset title="Thông tin học viên" p="md">
        <Group mb="md">
          <TextInput
            placeholder="Tìm kiếm học viên"
            leftSection={<IconSearch size={16} />}
            rightSection={isSearching && <Loader size={16} color="blue" />}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                handleSearchClick();
              }
            }}
          />
          <Button
            onClick={handleSearchClick}
            disabled={!searchQuery.trim()}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={handleAddNewClick}
          >
            Thêm mới
          </Button>
        </Group>

        {showCreateForm && (
          <F_gxlkvmytwo_Step1_Create
            nextStep={nextStep}
          />
        )}

        {selectedStudent && !showCreateForm && (
          <F_gxlkvmytwo_Step1_Read student={selectedStudent} nextStep={nextStep} />
        )}

      </MyFieldset>

      <F_gxlkvmytwo_Step1_Modal
        opened={modalOpened}
        onClose={handleModalClose}
        searchQuery={searchQuery}
        onStudentSelect={handleStudentSelect}
      />
    </Box>
  );
}
