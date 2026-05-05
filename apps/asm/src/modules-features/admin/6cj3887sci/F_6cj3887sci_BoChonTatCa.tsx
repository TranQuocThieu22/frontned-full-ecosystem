import { Button } from '@mantine/core'
import { useS_6cj3887sci } from './S_6cj3887sci'

export default function F_6cj3887sci_BoChonTatCa() {
    const store = useS_6cj3887sci()
    return (
        <Button onClick={store.setAllThuFalse}>Bỏ chọn tất cả</Button>
    )
}
