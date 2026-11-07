import io
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
p = 'src/features/auth/components/LoginPage.tsx'
s = io.open(p, encoding='utf-8').read().replace('\r\n', '\n')

# 1. add register step state
s = s.replace(
    '  const [redirectTo, setRedirectTo] = useState<string | null>(null);\n',
    '  const [redirectTo, setRedirectTo] = useState<string | null>(null);\n'
    '  const [registerStep, setRegisterStep] = useState<1 | 2>(1);\n',
)

# 2. reset step on tab change
s = s.replace(
    '    setActiveTab(tab);\n'
    '    setAuthError(null);\n',
    '    setActiveTab(tab);\n'
    '    setRegisterStep(1);\n'
    '    setAuthError(null);\n',
)

# 3. heading becomes step-aware
old_head = (
    '              <h1 className="text-2xl font-bold text-foreground mb-1">Tạo tài khoản</h1>\n'
    '              <p className="text-sm text-secondary">Dùng email của bạn để tạo tài khoản Smurfy.</p>\n'
)
new_head = (
    '              <h1 className="text-2xl font-bold text-foreground mb-1">Tạo tài khoản</h1>\n'
    '              <p className="text-sm text-secondary">\n'
    "                {registerStep === 1 ? 'Bước 1 của 2 — Thông tin của bạn.' : 'Bước 2 của 2 — Mật khẩu đăng nhập.'}\n"
    '              </p>\n'
    '              <div className="flex gap-1.5 mt-3" aria-hidden="true">\n'
    "                <div className={`h-1 flex-1 rounded-full ${registerStep === 1 ? 'bg-primary' : 'bg-primary-soft'}`} />\n"
    "                <div className={`h-1 flex-1 rounded-full ${registerStep === 2 ? 'bg-primary' : 'bg-primary-soft'}`} />\n"
    '              </div>\n'
)
assert old_head in s, 'head miss'
s = s.replace(old_head, new_head)

# 4. split register form into two steps
old_form = (
    '            {activeTab === \'register\' && (\n'
    '              <Input\n'
    '                label="Họ tên"\n'
    '                icon={<User size={17} />}\n'
    '                placeholder="Nhập họ tên"\n'
    '                {...registerForm.register(\'name\')}\n'
    '                error={registerForm.formState.errors.name?.message}\n'
    '                size="lg"\n'
    '              />\n'
    '            )}\n'
    '\n'
    '            <Input\n'
    '              label="Email"\n'
    '              icon={<Mail size={17} />}\n'
    '              type="email"\n'
    '              placeholder="Nhập địa chỉ email"\n'
    "              {...(activeTab === 'login' ? loginForm.register('email') : registerForm.register('email'))}\n"
    '              error={\n'
    "                activeTab === 'login'\n"
    '                  ? loginForm.formState.errors.email?.message\n'
    '                  : registerForm.formState.errors.email?.message\n'
    '              }\n'
    '              autoComplete="email"\n'
    '              size="lg"\n'
    '            />\n'
    '\n'
    "            {activeTab === 'register' && (\n"
    '              <DatePicker\n'
    '                label="Ngày sinh"\n'
    "                value={registerForm.watch('dob')}\n"
    "                onChange={(ts) => registerForm.setValue('dob', ts, { shouldValidate: true })}\n"
    '                placeholder="Chọn ngày sinh"\n'
    '                error={registerForm.formState.errors.dob?.message}\n'
    '                size="lg"\n'
    '              />\n'
    '            )}\n'
    '\n'
    '            <div>\n'
    '              <Input\n'
    '                label="Mật khẩu"\n'
    '                icon={<Lock size={17} />}\n'
    "                type={showPassword ? 'text' : 'password'}\n"
    "                placeholder=\"Nhập mật khẩu\"\n"
    "                autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}\n"
    "                {...(activeTab === 'login' ? loginForm.register('password') : registerForm.register('password'))}\n"
    '                error={\n'
    "                  activeTab === 'login'\n"
    '                    ? loginForm.formState.errors.password?.message\n'
    '                    : registerForm.formState.errors.password?.message\n'
    '                }\n'
    '                size="lg"\n'
    '                rightElement={passwordToggle(showPassword, () => setShowPassword((p) => !p))}\n'
    '              />\n'
    "              {activeTab === 'login' && (\n"
    '                <div className="flex items-center justify-between mt-2.5">\n'
    '                  <Checkbox\n'
    '                    label="Ghi nhớ đăng nhập"\n'
    '                    checked={rememberMe}\n'
    '                    onCheckedChange={(checked) => setRememberMe(checked === true)}\n'
    '                  />\n'
    '                  <button\n'
    '                    type="button"\n'
    "                    onClick={() => handleTabChange('forgot')}\n"
    '                    className="text-caption text-primary-strong hover:underline font-semibold transition-colors"\n'
    '                  >\n'
    '                    Quên mật khẩu?\n'
    '                  </button>\n'
    '                </div>\n'
    '              )}\n'
    '            </div>\n'
    '\n'
    "            {activeTab === 'register' && (\n"
    '              <Input\n'
    '                label="Xác nhận mật khẩu"\n'
    '                icon={<Lock size={17} />}\n'
    "                type={showConfirmPassword ? 'text' : 'password'}\n"
    '                placeholder="Xác nhận mật khẩu"\n'
    '                autoComplete="new-password"\n'
    "                {...registerForm.register('confirmPassword')}\n"
    '                error={registerForm.formState.errors.confirmPassword?.message}\n'
    '                size="lg"\n'
    '                rightElement={passwordToggle(showConfirmPassword, () => setShowConfirmPassword((p) => !p))}\n'
    '              />\n'
    '            )}\n'
    '\n'
    '            <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading} className="mt-1">\n'
    "              {activeTab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}\n"
    '            </Button>\n'
)
new_form = (
    '            <Input\n'
    '              label="Email"\n'
    '              icon={<Mail size={17} />}\n'
    '              type="email"\n'
    '              placeholder="Nhập địa chỉ email"\n'
    "              {...(activeTab === 'login' ? loginForm.register('email') : registerForm.register('email'))}\n"
    '              error={\n'
    "                activeTab === 'login'\n"
    '                  ? loginForm.formState.errors.email?.message\n'
    '                  : registerForm.formState.errors.email?.message\n'
    '              }\n'
    '              autoComplete="email"\n'
    '              size="lg"\n'
    '            />\n'
    '\n'
    "            {activeTab === 'register' && registerStep === 1 && (\n"
    '              <>\n'
    '                <Input\n'
    '                  label="Họ tên"\n'
    '                  icon={<User size={17} />}\n'
    '                  placeholder="Nhập họ tên"\n'
    "                  {...registerForm.register('name')}\n"
    '                  error={registerForm.formState.errors.name?.message}\n'
    '                  size="lg"\n'
    '                />\n'
    '                <DatePicker\n'
    '                  label="Ngày sinh"\n'
    "                  value={registerForm.watch('dob')}\n"
    "                  onChange={(ts) => registerForm.setValue('dob', ts, { shouldValidate: true })}\n"
    '                  placeholder="Chọn ngày sinh"\n'
    '                  error={registerForm.formState.errors.dob?.message}\n'
    '                  size="lg"\n'
    '                />\n'
    '                <Button\n'
    '                  type="button"\n'
    '                  variant="primary"\n'
    '                  size="lg"\n'
    '                  fullWidth\n'
    '                  className="mt-1"\n'
    '                  onClick={async () => {\n'
    "                    const ok = await registerForm.trigger(['name', 'email', 'dob']);\n"
    '                    if (ok) setRegisterStep(2);\n'
    '                  }}\n'
    '                >\n'
    '                  Tiếp tục\n'
    '                </Button>\n'
    '                <div className="text-center pt-1">\n'
    '                  <button\n'
    '                    type="button"\n'
    "                    onClick={() => handleTabChange('login')}\n"
    '                    className="text-sm text-secondary hover:text-primary-strong font-medium transition-colors duration-200"\n'
    '                  >\n'
    '                    ← Quay lại đăng nhập\n'
    '                  </button>\n'
    '                </div>\n'
    '              </>\n'
    '            )}\n'
    '\n'
    "            {(activeTab === 'login' || (activeTab === 'register' && registerStep === 2)) && (\n"
    '              <>\n'
    "                {activeTab === 'register' && registerStep === 2 && (\n"
    '                  <button\n'
    '                    type="button"\n'
    '                    onClick={() => setRegisterStep(1)}\n'
    '                    className="text-sm text-secondary hover:text-primary-strong font-medium transition-colors duration-200 self-start"\n'
    '                  >\n'
    '                    ← Quay lại bước trước\n'
    '                  </button>\n'
    '                )}\n'
    '                <Input\n'
    '                  label="Mật khẩu"\n'
    '                  icon={<Lock size={17} />}\n'
    "                  type={showPassword ? 'text' : 'password'}\n"
    '                  placeholder="Nhập mật khẩu"\n'
    "                  autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}\n"
    "                  {...(activeTab === 'login' ? loginForm.register('password') : registerForm.register('password'))}\n"
    '                  error={\n'
    "                    activeTab === 'login'\n"
    '                      ? loginForm.formState.errors.password?.message\n'
    '                      : registerForm.formState.errors.password?.message\n'
    '                  }\n'
    '                  size="lg"\n'
    '                  rightElement={passwordToggle(showPassword, () => setShowPassword((p) => !p))}\n'
    '                />\n'
    '\n'
    "                {activeTab === 'register' && (\n"
    '                  <Input\n'
    '                    label="Xác nhận mật khẩu"\n'
    '                    icon={<Lock size={17} />}\n'
    "                    type={showConfirmPassword ? 'text' : 'password'}\n"
    '                    placeholder="Xác nhận mật khẩu"\n'
    '                    autoComplete="new-password"\n'
    "                    {...registerForm.register('confirmPassword')}\n"
    '                    error={registerForm.formState.errors.confirmPassword?.message}\n'
    '                    size="lg"\n'
    '                    rightElement={passwordToggle(showConfirmPassword, () => setShowConfirmPassword((p) => !p))}\n'
    '                  />\n'
    '                )}\n'
    '\n'
    "                {activeTab === 'login' && (\n"
    '                  <div className="flex items-center justify-between mt-2.5">\n'
    '                    <Checkbox\n'
    '                      label="Ghi nhớ đăng nhập"\n'
    '                      checked={rememberMe}\n'
    '                      onCheckedChange={(checked) => setRememberMe(checked === true)}\n'
    '                    />\n'
    '                    <button\n'
    '                      type="button"\n'
    "                      onClick={() => handleTabChange('forgot')}\n"
    '                      className="text-caption text-primary-strong hover:underline font-semibold transition-colors"\n'
    '                    >\n'
    '                      Quên mật khẩu?\n'
    '                    </button>\n'
    '                  </div>\n'
    '                )}\n'
    '\n'
    '                <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading} className="mt-1">\n'
    "                  {activeTab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}\n"
    '                </Button>\n'
    '              </>\n'
    '            )}\n'
)
assert old_form in s, 'register form block miss'
s = s.replace(old_form, new_form)

io.open(p, 'w', encoding='utf-8', newline='\n').write(s)
print('register 2-step done')
