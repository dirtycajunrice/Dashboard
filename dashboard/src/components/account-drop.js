import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>…</DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content>
        <DropdownMenu.Item className="DropdownMenuItem" disabled>
          …
        </DropdownMenu.Item>
        <DropdownMenu.Item className="DropdownMenuItem">…</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);