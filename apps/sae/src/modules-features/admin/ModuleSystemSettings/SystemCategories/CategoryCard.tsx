"use client"

import { Anchor, Card, Group, Text, ThemeIcon } from "@mantine/core"
import { IconError404 } from "@tabler/icons-react"
import { motion } from "framer-motion"
import Link from "next/link"
import type { ISystemCategory } from "./interfaces"

interface CategoryCardProps {
  category: ISystemCategory
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Anchor href={category.link} underline="never" component={Link}>
      <motion.div
        whileHover={{
          scale: 1.02,
          y: -4,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        style={{ height: "100%" }}
      >
        <Card shadow="lg" padding="sm" radius="md" withBorder style={{ cursor: "pointer", height: "100%" }}>
          <Group gap="md" align="flex-start">
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
            >
              <ThemeIcon size={48} radius="sm" color="transparent">
                {
                  category.icon ? (
                    <category.icon size={24} />
                  ) : (
                    <IconError404 size={24} color="red" />
                  )
                }
              </ThemeIcon>
            </motion.div>

            <motion.div
              style={{ flex: 1 }}
              whileHover={{ x: 4 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Text fw={600} size="sm" lineClamp={2}>
                  {category.name}
                </Text>
              </motion.div>

              <motion.div initial={{ opacity: 0.7 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <Text size="xs" c="dimmed" mt={4}>
                  {category.description}
                </Text>
              </motion.div>
            </motion.div>
          </Group>
        </Card>
      </motion.div>
    </Anchor>
  )
}