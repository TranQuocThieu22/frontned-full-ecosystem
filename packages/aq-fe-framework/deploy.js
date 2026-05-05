const { execSync } = require('child_process');
const readline = require('readline');

// Tạo giao diện nhập từ terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Hỏi commit message trước tiên
rl.question('Nhập commit message: ', (commitMessage) => {
  try {
    console.log('🚀 Bắt đầu gen...');
    execSync('npm run gen', { stdio: 'inherit' });

    console.log('🏗️ Bắt đầu build...');
    execSync('npm run build-npm', { stdio: 'inherit' });

    console.log('🔖 Tăng version patch...');
    execSync('npm version patch', { stdio: 'inherit' });
    console.log('📦 Commit thay đổi...');
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });


    // console.log('🚀 Đẩy code lên main...');
    // execSync('git push origin', { stdio: 'inherit' });

    // console.log('🌍 Publish package...');
    // execSync('npm publish --access public', { stdio: 'inherit' });

    console.log('🎉 Deploy thành công!');
  } catch (error) {
    console.error('❌ Có lỗi xảy ra trong quá trình deploy:', error);
  } finally {
    rl.close();
  }
});
