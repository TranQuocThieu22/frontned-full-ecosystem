'use client';
import { CategoryPanel } from '@/features/admin/dashboard-clone/CategoryPanel';
import { Accordion, Badge, Card, Group, Text } from '@mantine/core';
import { useEffect } from 'react';
import type { Tile } from './types';

const HEADER_OFFSET = 120;

function waitForStable(el: HTMLElement, quietMs = 150, timeoutMs = 900) {
  return new Promise<void>(resolve => {
    let lastChange = performance.now();
    const start = performance.now();
    const ro = new ResizeObserver(() => {
      lastChange = performance.now();
    });
    ro.observe(el);

    const tick = () => {
      const now = performance.now();
      if (now - lastChange >= quietMs || now - start > timeoutMs) {
        ro.disconnect();
        resolve();
      } else {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  });
}

type Props = {
  tiles: Tile[];
  active: string | null;
  onChange: (v: string | null) => void;
};

export function CategoryAccordion({ tiles, active, onChange }: Props) {
  useEffect(() => {
    if (!active) return;
    const panel = document.getElementById(
      `panel-${active}`
    ) as HTMLElement | null;
    if (!panel) return;

    waitForStable(panel).then(() => {
      const top =
        panel.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }, [active]);

  return (
    <Card withBorder radius="lg" p="0" mt="sm">
      <Accordion
        chevronPosition="right"
        multiple={false}
        variant="contained"
        value={active}
        onChange={onChange}
        transitionDuration={0}
      >
        {tiles.map(t => (
          <Accordion.Item key={t.code} value={String(t.code)}>
            <Accordion.Control>
              <Group justify="space-between" wrap="nowrap" pe="sm">
                <Group gap="xs" wrap="nowrap">
                  <t.Icon size={18} />
                  <Text fw={600}>{t.title}</Text>
                </Group>

                <Group gap="xs" wrap="nowrap">
                  <Badge
                    size="md"
                    radius="sm"
                    variant="light"
                    color={
                      t.achieved === 0
                        ? 'red'
                        : t.achieved < t.total
                          ? 'yellow'
                          : 'teal'
                    }
                  >
                    {t.achieved}/{t.total} đạt
                  </Badge>

                  <Badge
                    color={t.achieved === t.total ? 'teal' : 'red'}
                    variant="light"
                    size="md"
                    radius="sm"
                  >
                    {t.achieved === t.total ? 'Hoàn thành' : 'Chưa hoàn thành'}
                  </Badge>
                </Group>
              </Group>
            </Accordion.Control>

            <Accordion.Panel>
              <div
                id={`panel-${t.code}`}
                style={{ scrollMarginTop: HEADER_OFFSET }}
              >
                <CategoryPanel items={t.items} />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
}

export default CategoryAccordion;
